import React from "react";

export default function UserMark({ username, rank }) {
    let mark = null;

    if (rank === '기부자') {
        mark = <span role="img" aria-label="Donator">☘️</span>;
    } else if (rank === '탑순위 10위권') {
        mark = <span role="img" aria-label="Top 10">🍀</span>;
    } else if (rank === '1위') {
        mark = <span role="img" aria-label="First Place">💗</span>;
    }

    return (
        <div>
            {mark} {username}
        </div>
    );
}