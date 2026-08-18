import React, { useState } from 'react';

interface FolderProps {
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({
  color = '#a855f7',
  gradientFrom,
  gradientTo,
  size = 1,
  items = [],
  className = ''
}) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const from = gradientFrom || color;
  const to = gradientTo || color;
  const fromDark = darkenColor(from, 0.18);
  const toDark = darkenColor(to, 0.22);
  const folderBackGradient = `linear-gradient(160deg, ${fromDark} 0%, ${toDark} 100%)`;
  const flapLeftGradient = `linear-gradient(210deg, ${from} 0%, ${to} 70%, ${toDark} 100%)`;
  const flapRightGradient = `linear-gradient(150deg, ${to} 0%, ${from} 65%, ${fromDark} 100%)`;
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  const flapBaseStyle: React.CSSProperties = {
    borderRadius: '5px 10px 10px 10px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22)'
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          transform: open ? 'translateY(-8px)' : undefined,
          filter: `drop-shadow(0 6px 8px ${from}28)`
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundImage: folderBackGradient }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundImage: folderBackGradient }}
          ></span>
          {papers.map((item, i) => {
            let sizeClasses = '';
            if (i === 0) sizeClasses = 'w-[70%] h-[80%]';
            if (i === 1) sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';
            if (i === 2) sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onClick={e => {
                  if (open) e.stopPropagation();
                }}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 overflow-hidden transition-all duration-300 ease-in-out ${
                  !open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.18)'
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className={`absolute z-30 w-full h-full origin-bottom overflow-hidden transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              ...flapBaseStyle,
              backgroundImage: flapLeftGradient,
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-28"
              style={{
                background:
                  'linear-gradient(115deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 62%)'
              }}
            />
          </div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom overflow-hidden transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              ...flapBaseStyle,
              backgroundImage: flapRightGradient,
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-22"
              style={{
                background:
                  'linear-gradient(245deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 45%)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
