import React from 'react';
import '../css/rank_profile.css';

export const Element = ( {rankNum ,rankName}) => {
  

  return (
    <div className="element">
    <div className="avatar">
      <div className="overlap-group">{/*프로필 사진 */} 
        <div className="rank-badge"> {/*순위 뱃지 */}
          <div className="badge-frame">
            <div className="rank-num">{rankNum}</div> {/*순위 */}
          </div>
        </div>
      </div>
    </div>
    <div className="rank-name">{rankName}</div>
  </div>
  );
};

