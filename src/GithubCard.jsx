import { useState } from "react";
import axios from "axios";

function GithubCard() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(resp.data);
      setError(null);
    } catch (err) {
      setProfile(null);
      setError("User not found");
    }
  };

  return (
    <div className="h-[90vh] w-[80vw] rounded-lg border border-[#353F4F] p-5 flex justify-center gap-5 items-center flex-col">
      <form
        className="h-[10%] w-full flex justify-evenly gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <div className="w-[5%]">
          <img src="/github-logo.png" alt="git" />
        </div>
        <input
          type="text"
          value={username}
          className="w-[80%] text-[1.2em] text-center outline-none bg-[#293548] text-slate-300 rounded-md placeholder-slate-500"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter user name ...."
        />
        <button
          type="submit"
          className="w-[10%] bg-[#2A3446] text-[#838487] rounded-xl"
        >
          Search
        </button>
      </form>

      <div className="h-[90%] w-full p-2 flex gap-4">
        <div className="one h-full w-[30%] bg-white bg-opacity-10 backdrop-blur-md rounded-md flex flex-col gap-2 p-2">
          <div className="h-[30%] w-full bg-[#1E293B] border border-[#35434b88] rounded-md flex justify-center items-center">
            <div className="image rounded-full w-[40%] overflow-hidden">
              {profile && (
                <img
                  src={profile.avatar_url}
                  alt="profile"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
          <div className="h-[70%] w-full flex gap-2 flex-col p-1">
            <p className="text-center bg-[#475569] text-[#94A3B8] rounded h-[10%]">
              {profile?.login}
            </p>
            <div className="relative w-full text-left h-[50%] overflow-scroll scrollbar-hide">
              <h1 className="sticky top-0 left-0 text-center font-bold text-white">
                Bio
              </h1>
              <p className="text-[0.8em] text-zinc-400 text-center">
                {profile?.bio || "No bio available"}
              </p>
            </div>
            <div className="h-[40%] flex p-2 gap-2">
              <div className="w-1/2 text-slate-500 rounded-md bg-gradient-to-tr from-[#1A2345] via-[#1C2D51] to-[#172E48] text-center">
                <h2 className="text-[2em] font-bold">{profile?.followers}</h2>
                <h2 className="text-[1.2em] font-bold">Followers</h2>
              </div>
              <div className="w-1/2  text-slate-500 rounded-md bg-gradient-to-tr from-[#1A2345] via-[#1C2D51] to-[#172E48] text-center">
                <h2 className="text-[2em] font-bold">{profile?.following}</h2>
                <h2 className="text-[1.2em] font-bold">Following</h2>
              </div>
            </div>
          </div>
        </div>
        {/* Second card */}
        <div className="two min-h-[50vh] w-[70%] bg-white bg-opacity-10 rounded-md backdrop-blur-md p-2 flex flex-col gap-2">
          <div className="basicinfo bg-[#293548] w-full min-h-[40%] p-2 flex flex-col gap-2">
            {error && <p className="text-red-700">{error}</p>}
            <p className="Name bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Name :{profile?.name || "No name available"}
            </p>
            <p className="id bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              ID: {profile?.id}
            </p>
            <p className="type bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Type: {profile?.type}
            </p>
            <p className="company bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Company: {profile?.company || "No company info"}
            </p>
            <p className="location bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Location: {profile?.location || "No location info"}
            </p>
          </div>
          <div className="basicinfo bg-[#293548] w-full min-h-[40%] p-2 flex flex-col gap-2">
            <p className="email bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Email: {profile?.email || "No email info"}
            </p>
            <p className="created_at bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Created At: {new Date(profile?.created_at).toLocaleDateString()}
            </p>
            <p className="updated_at bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Updated At: {new Date(profile?.updated_at).toLocaleDateString()}
            </p>
            <p className="public_repos bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              Public Repos: {profile?.public_repos}
            </p>
            <p className="html_url bg-[#1E293B] text-[#7DD3FC] text-[0.9em] p-1 w-full border border-[#353F4F] rounded">
              <a
                href={profile?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Profile Link
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GithubCard;
