import React from "react";

const ListOfUsers = ({ listOfUsers, data }) => {
    function addtext(x) {
        var e = document.getElementById("input");
        e.value += x;
    }

    return (
        <div>
            {listOfUsers?.map((user) => {
                return (
                    <button
                        key={user.id}
                        onClick={() => addtext("@" + user.username)}
                    >
                        @{user.username}
                    </button>
                );
            })}
        </div>
    );
};

export default ListOfUsers;
