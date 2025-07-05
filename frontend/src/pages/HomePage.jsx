import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { capitialize } from "../lib/utils";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const ids = new Set();
    outgoingFriendReqs?.forEach((r) => ids.add(r.recipient._id));
    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  /* —— Reusable styles —— */
  const btn =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2";
  const primaryBtn = `${btn} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-60`;
  const outlineBtn =
    "inline-flex items-center gap-2 rounded-lg border border-indigo-600 px-3 py-1.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition";

  const pill =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* ——— Friends ——— */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">
            Your Friends
          </h2>
          <Link to="/notifications" className={outlineBtn}>
            <UsersIcon className="w-4 h-4" /> Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-16">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((f) => (
              <FriendCard key={f._id} friend={f} />
            ))}
          </div>
        )}

        {/* ——— Recommendations ——— */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">
                Meet New Learners
              </h2>
              <p className="text-sm text-gray-600">
                Discover learners of InternDesire Platform
              </p>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-16">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="rounded-xl bg-white/90 backdrop-blur-lg ring-1 ring-gray-100 p-8 text-center shadow">
              <h3 className="mb-1 text-lg font-semibold text-gray-800">
                No recommendations available
              </h3>
              <p className="text-sm text-gray-600">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedUsers.map((u) => {
                const alreadySent = outgoingRequestsIds.has(u._id);
                return (
                  <div
                    key={u._id}
                    className="rounded-xl bg-white/90 backdrop-blur-lg ring-1 ring-gray-100 p-6 shadow transition hover:shadow-lg"
                  >
                    {/* user header */}
                    <div className="flex items-center gap-4">
                      <img
                        src={u.profilePic}
                        alt={u.fullName}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {u.fullName}
                        </h3>
                        {u.location && (
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <MapPinIcon className="mr-1 h-4 w-4" />
                            {u.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* languages */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={`${pill} bg-indigo-600 text-white`}>
                        {getLanguageFlag(u.nativeLanguage)} Native:{" "}
                        {capitialize(u.nativeLanguage)}
                      </span>
                      <span
                        className={`${pill} border border-indigo-600 text-indigo-600`}
                      >
                        {getLanguageFlag(u.learningLanguage)} Learning:{" "}
                        {capitialize(u.learningLanguage)}
                      </span>
                    </div>

                    {u.bio && (
                      <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                        {u.bio}
                      </p>
                    )}

                    {/* action */}
                    <button
                      onClick={() => sendRequestMutation(u._id)}
                      disabled={alreadySent || isPending}
                      className={
                        alreadySent
                          ? `${btn} border border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed opacity-70`
                          : primaryBtn
                      }
                    >
                      {alreadySent ? (
                        <>
                          <CheckCircleIcon className="h-4 w-4" />
                          Request Sent
                        </>
                      ) : (
                        <>
                          <UserPlusIcon className="h-4 w-4" />
                          Send Friend Request
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
