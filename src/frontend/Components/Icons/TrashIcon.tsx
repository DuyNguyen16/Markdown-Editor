import React from 'react';

const TrashIcon = () => {
  return (
    <div className="relative w-[18px] h-[20px] group">
      {/* Shape */}
      <div className="absolute w-[18px] h-[20px] bg-[#7C8187] group-hover:bg-[#FF6347]" style={{ top: '26px', left: '1230px' }} />

      {/* Path 1 */}
      <div className="absolute w-[2px] h-[8px] bg-[#7C8187] group-hover:bg-[#FF6347]" style={{ top: '34px', left: '1236px' }} />

      {/* Path 2 */}
      <div className="absolute w-[4px] h-[2px] bg-[#7C8187] group-hover:bg-[#FF6347]" style={{ top: '28px', left: '1237px' }} />

      {/* Path 3 */}
      <div className="absolute w-[10px] h-[12px] bg-[#7C8187] group-hover:bg-[#FF6347]" style={{ top: '32px', left: '1234px' }} />

      {/* Path 4 */}
      <div className="absolute w-[2px] h-[8px] bg-[#7C8187] group-hover:bg-[#FF6347]" style={{ top: '34px', left: '1240px' }} />
    </div>
  );
};

export default TrashIcon;
