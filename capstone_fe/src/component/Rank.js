import React from 'react';
import '../css/Rank.css';

const Avatar = ({ index, imageSrc, badgeNumber, nickname }) => {
  const badgeColor = index <= 3 ? ['#CAC4D0', '#FFCD1A', '#9E7147'][index - 1] : '#867B54';

  return (
    <div className={`rank_list ${index}`}>
      <div className="Avatar">
        <img className="Subtract" src={imageSrc}  /> {/*프로필사진*/}
        <div className="PresenceBadge">{/*순위 뱃지*/}
          <div className="rank-badge">
            <div className="ellipse" style={{ background: badgeColor }} />{/**/}
            <div>{badgeNumber}</div>
          </div>
        </div>
      </div>
      <div className="nickname"></div>{/*닉네임*/}
    </div>
  );
};

export default Avatar;
