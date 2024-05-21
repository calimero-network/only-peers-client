import Header from "../../components/header/header";
import router, { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { setAppEndpointKey } from "src/lib/storage";
import Button from "src/components/button/button";
import CalimeroLogo from "src/components/icons/Logo";
import apiClient from "src/api";
import Loader from "src/components/loader/loader";

export default function SetupPage() {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<String | null>(
    process.env["NEXT_PUBLIC_RPC_BASE_URL"]
  );
  const MINIMUM_LOADING_TIME = 2000; // Minimum loading time in milliseconds (e.g., 2 seconds)

  function validateUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch (e) {
      return false;
    }
  }

  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setError("");
    setUrl(value);
  };

  const checkConnection = useCallback(async () => {
    if (!url) return;
    if (validateUrl(url.toString())) {
      setLoading(true);
      const timer = new Promise((resolve) =>
        setTimeout(resolve, MINIMUM_LOADING_TIME)
      );

      const fetchData = apiClient.node().health({ url: url });
      Promise.all([timer, fetchData]).then(([, response]) => {
        if (response.data) {
          setError("");
          setAppEndpointKey(url);
          router.push("/auth");
        } else {
          setError("Connection failed. Please check if node url is correct.");
        }
        setLoading(false);
      });
    } else {
      setError("Connection failed. Please check if node url is correct.");
    }
  }, [url]);

  return (
    <div className="flex h-screen justify-center bg-[#111111]">
      <div className="flex flex-col justify-center items-center">
        <div className="items-center bg-[#1C1C1C] p-8 gap-y-4 rounded-lg">
          <div className="grid justify-items-center items-center space-y-8 px-14">
            <div className="text-white text-4xl font-semibold">
              Only Peers setup
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div>
                  <input
                    type="text"
                    style={{ width: "400px" }}
                    className="p-2 rounded-md"
                    placeholder="node url"
                    inputMode="url"
                    value={url?.toString() || ""}
                    onChange={handleChange}
                  />
                  <div className="text-red-500">{error}</div>
                </div>
                <Button
                  disabled={!url}
                  onClick={() => {
                    checkConnection();
                  }}
                  title={"Set node URL"}
                  backgroundColor="border-gray-400"
                  backgroundColorHover="hover:border-white"
                />
                <div className="mt-6">
                  <CalimeroLogo />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
