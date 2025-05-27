export const getUsername = (username: string) => {
    const parts = username.split("-");
    if (parts.length > 1) {
      return parts[0] + " - " + parts[1].substring(0, 4) + "..." + parts[1].substring(parts[1].length - 4);
    }
    return parts[0].substring(0, 4) + "..." + parts[0].substring(parts[0].length - 4);
  };