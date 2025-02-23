const Groups = () => {
    return (
      <div className="flex flex-col gap-2 p-4 bg-gray-50 border border-gray-300 rounded-lg">
        <div className="flex items-center gap-2">
          <img
            src="/group1.png"
            alt="Squad Ghouls"
            className="h-8 w-8 rounded-full"
          />
          <span>Squad Ghouls</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/group2.png"
            alt="Film Fanatics"
            className="h-8 w-8 rounded-full"
          />
          <span>Film Fanatics</span>
        </div>
      </div>
    );
  };
  
  export default Groups;
  