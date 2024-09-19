export default function ClassBox({ id, name, color, handleRemove, onNavigate }) {
    return (
      <div 
        className="w-64 h-32 text-3xl font-semibold rounded-3xl shadow-lg relative cursor-pointer" 
        style={{ backgroundColor: `#${color}` }}
        onClick={onNavigate}  
      >
        <div className="flex flex-row">
          <h1 className="p-4">{name}</h1>
          <i 
            className="fa-solid fa-trash absolute top-4 right-4 text-2xl hover:text-black cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();  
              handleRemove();      
            }}
          ></i>
        </div>
      </div>
    );
  }
  