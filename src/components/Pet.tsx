import { useEffect, useRef, useState } from "react";

interface PetProps {
  stage: "egg" | "small" | "medium" | "large" | "buff";
  mood: number;
}

const Pet = ({ stage, mood }: PetProps) => {
  const petRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [velocity, setVelocity] = useState({ x: 1, y: 1 });
  const containerSize = { width: 300, height: 300 };
  
  const petSizes = {
    egg: 40,
    small: 50,
    medium: 65,
    large: 80,
    buff: 95,
  };
  
  const petSize = petSizes[stage];

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // Collision detection with boundaries
        if (newX <= 0 || newX + petSize >= containerSize.width) {
          newVelX = -velocity.x;
          newX = Math.max(0, Math.min(newX, containerSize.width - petSize));
        }
        
        if (newY <= 0 || newY + petSize >= containerSize.height) {
          newVelY = -velocity.y;
          newY = Math.max(0, Math.min(newY, containerSize.height - petSize));
        }

        setVelocity({ x: newVelX, y: newVelY });
        
        // Random direction change occasionally
        if (Math.random() > 0.98) {
          setVelocity({
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          });
        }

        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [velocity, petSize]);

  const getPetColor = () => {
    if (mood > 70) return "bg-primary";
    if (mood > 40) return "bg-stat-medium";
    return "bg-stat-low";
  };

  const getPetEmoji = () => {
    switch (stage) {
      case "egg": return "🥚";
      case "small": return "🐣";
      case "medium": return "🐤";
      case "large": return "🐥";
      case "buff": return "💪🐔";
      default: return "🐣";
    }
  };

  return (
    <div 
      className="relative rounded-2xl shadow-inner overflow-hidden"
      style={{ 
        width: containerSize.width, 
        height: containerSize.height,
        background: 'linear-gradient(to bottom, #87CEEB 0%, #B4E2EA 30%, #C8E6F5 60%, #90EE90 75%, #7CB342 85%, #689F38 100%)'
      }}
    >
      {/* Sky decorations */}
      {/* Sun */}
      <div 
        className="absolute top-4 right-6 w-8 h-8 rounded-full"
        style={{ backgroundColor: '#FFD700' }}
      />
      
      {/* Clouds */}
      <div className="absolute top-6 left-4">
        <div 
          className="w-6 h-3 rounded-full opacity-80"
          style={{ backgroundColor: 'white' }}
        />
        <div 
          className="w-4 h-2 rounded-full opacity-80 -mt-1 ml-2"
          style={{ backgroundColor: 'white' }}
        />
      </div>
      
      <div className="absolute top-8 right-16">
        <div 
          className="w-5 h-2 rounded-full opacity-70"
          style={{ backgroundColor: 'white' }}
        />
        <div 
          className="w-3 h-2 rounded-full opacity-70 -mt-1 ml-1"
          style={{ backgroundColor: 'white' }}
        />
      </div>
      
      <div
        ref={petRef}
        className="absolute transition-all duration-200 flex items-center justify-center"
        style={{
          width: petSize,
          height: petSize,
          left: position.x,
          top: position.y,
          fontSize: petSize * 0.8,
          filter: mood < 40 ? 'grayscale(30%)' : 'none',
          transform: `scaleX(${velocity.x > 0 ? 1 : -1})`,
          animation: 'bounce 0.5s infinite'
        }}
      >
        {getPetEmoji()}
      </div>
    </div>
  );
};

export default Pet;
