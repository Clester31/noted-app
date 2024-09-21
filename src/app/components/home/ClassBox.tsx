export default function ClassBox({ id, name, color, handleRemove, onNavigate }) {
    return (
      <div 
        className="w-64 h-32 text-3xl font-semibold rounded-3xl shadow-lg relative cursor-pointer transition-transform duration-150 ease-out hover:scale-105" 
        style={{ backgroundColor: `#${color}` }}
        onClick={onNavigate}  
      >
        <div className="flex flex-row">
          <h1 className="p-4">{name}</h1>
          <i 
            className="fa-solid fa-trash absolute top-4 right-4 text-2xl hover:text-black cursor-pointer transition duration-150 ease-out" 
            onClick={(e) => {
              e.stopPropagation();  
              handleRemove();      
            }}
          ></i>
        </div>
      </div>
    );
  }
  