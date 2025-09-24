import React from "react";
import LoggedWish from "@/LoggedWish/LoggedWish";

export default async function WishList() {


return (
    <div className="mt-20">
      <h1 className="text-2xl p-3 font-bold mb-6">My Wish List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LoggedWish/>
      </div>
    </div>
  );
}
