import React, { useEffect } from "react";
import { useUser, useAuth } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import { syncUser } from "../lib/api";

function UseUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({ mutationFn: syncUser });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, isPending, isSuccess, user, syncUserMutation]);
  return { isSynced: isSuccess };
}

export default UseUserSync;
