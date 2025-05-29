use calimero_sdk::borsh::{BorshDeserialize, BorshSerialize};
use calimero_sdk::serde::Serialize;
use calimero_sdk::{app, env};
use calimero_storage::collections::Vector;

#[app::state(emits = for<'a> Event<'a>)]
#[derive(BorshDeserialize, BorshSerialize)]
#[borsh(crate = "calimero_sdk::borsh")]
pub struct OnlyPeers {
    posts: Vector<Post>,
}

#[derive(BorshDeserialize, BorshSerialize, Default, Serialize)]
#[borsh(crate = "calimero_sdk::borsh")]
#[serde(crate = "calimero_sdk::serde")]
pub struct Post {
    id: usize,
    title: String,
    content: String,
    comments: Vector<Comment>,
    calimero_user_id: String,
    username: String,
    likes: Vector<String>,
}

#[derive(BorshDeserialize, BorshSerialize, Default, Serialize, Clone)]
#[borsh(crate = "calimero_sdk::borsh")]
#[serde(crate = "calimero_sdk::serde")]
pub struct Comment {
    text: String,
    calimero_user_id: String,
    username: String,
}

#[app::event]
pub enum Event<'a> {
    PostCreated {
        id: usize,
        title: &'a str,
        content: &'a str,
        calimero_user_id: &'a str,
        username: &'a str,
    },
    CommentCreated {
        post_id: usize,
        calimero_user_id: &'a str,
        username: &'a str,
        text: &'a str,
    },
    PostLiked {
        post_id: usize,
        calimero_user_id: &'a str,
        username: &'a str,
    },
    PostUnliked {
        post_id: usize,
        calimero_user_id: &'a str,
        username: &'a str,
    },
}

#[app::logic]
impl OnlyPeers {
    #[app::init]
    pub fn init() -> OnlyPeers {
        OnlyPeers {
            posts: Vector::new(),
        }
    }

    pub fn post(&self, id: usize) -> app::Result<Option<Post>> {
        env::log(&format!("Getting post with id: {:?}", id));
        self.posts.get(id).map_err(Into::into)
    }

    pub fn posts(&self) -> app::Result<Vec<Post>> {
        env::log("Getting all posts");
        Ok(self.posts.iter()?.collect())
    }

    pub fn create_post(
        &mut self,
        title: String,
        content: String,
        calimero_user_id: String,
        username: String,
    ) -> app::Result<Post> {
        env::log(&format!(
            "Creating post with title: {:?} and content: {:?}",
            title, content
        ));

        let id = self.posts.len()?;
        let post = Post {
            id,
            title: title.clone(),
            content: content.clone(),
            comments: Vector::new(),
            calimero_user_id: calimero_user_id.clone(),
            username: username.clone(),
            likes: Vector::new(),
        };

        app::emit!(Event::PostCreated {
            id,
            title: &title,
            content: &content,
            calimero_user_id: &calimero_user_id,
            username: &username,
        });

        self.posts.push(post)?;
        match self.post(id)? {
            Some(post) => Ok(post),
            None => app::bail!("Failed to retrieve created post"),
        }
    }

    pub fn create_comment(
        &mut self,
        post_id: usize,
        calimero_user_id: String,
        username: String,
        text: String,
    ) -> app::Result<Option<Comment>> {
        env::log(&format!(
            "Creating comment under post with id: {:?} as user: {:?} with text: {:?}",
            post_id, calimero_user_id, text
        ));

        if let Some(mut post) = self.posts.get(post_id)? {
            let comment = Comment {
                calimero_user_id: calimero_user_id.clone(),
                username: username.clone(),
                text: text.clone(),
            };
            post.comments.push(comment.clone())?;
            self.posts.update(post_id, post)?;

            app::emit!(Event::CommentCreated {
                post_id,
                calimero_user_id: &calimero_user_id,
                text: &text,
                username: &username,
            });

            Ok(Some(comment))
        } else {
            Ok(None)
        }
    }

    pub fn like_post(
        &mut self,
        post_id: usize,
        calimero_user_id: String,
        username: String,
    ) -> app::Result<Option<Post>> {
        env::log(&format!(
            "Toggling like on post with id: {:?} for user: {:?}",
            post_id, calimero_user_id
        ));

        if let Some(mut post) = self.posts.get(post_id)? {
            // Check if user already liked the post
            if post.likes.contains(&calimero_user_id)? {
                // Unlike: Remove the user's like
                let mut likes = post.likes.iter()?.collect::<Vec<_>>();
                if let Some(idx) = likes.iter().position(|id| id == &calimero_user_id) {
                    likes.remove(idx);
                    post.likes = Vector::new();
                    for like in likes {
                        post.likes.push(like)?;
                    }
                }

                app::emit!(Event::PostUnliked {
                    post_id,
                    calimero_user_id: &calimero_user_id,
                    username: &username,
                });
            } else {
                // Like: Add the user's like
                post.likes.push(calimero_user_id.clone())?;

                app::emit!(Event::PostLiked {
                    post_id,
                    calimero_user_id: &calimero_user_id,
                    username: &username,
                });
            }

            // Update the post with new likes
            self.posts.update(post_id, post)?;
            self.post(post_id)
        } else {
            Ok(None)
        }
    }

    pub fn get_leaderboard(&self) -> app::Result<Vec<Post>> {
        let mut all_posts: Vec<Post> = self.posts.iter()?.collect();

        all_posts.sort_by(|a, b| {
            let a_likes = a.likes.len().unwrap_or(0);
            let b_likes = b.likes.len().unwrap_or(0);
            b_likes.cmp(&a_likes)
        });

        Ok(all_posts.into_iter().take(5).collect())
    }
}
