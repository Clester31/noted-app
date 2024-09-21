"use client"

import { useEffect, useState } from "react";
import ClassBox from "./components/home/ClassBox";
import { v4 as uuidv4 } from 'uuid';

import { useAppContext } from "./context/context";
import NewClassDisplay from "./components/home/NewClassDisplay";
import DeleteClassDisplay from "./components/home/DeleteClassDisplay";

export default function Home() {
  const { classList, classBoxColors, updateClassList, removeClass } = useAppContext();

  const [newClassDisplay, setNewClassDisplay] = useState<boolean>(false);
  const [deleteClassDisplay, setDeleteClassDisplay] = useState<boolean>(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>();

  const addNewClass = (className: string, classColor: string) => {
    setNewClassDisplay(!newClassDisplay);
    const newClass = {
      id: uuidv4(),
      name: className,
      color: classColor,
      notes: []
    }
    console.log(newClass);
    updateClassList(newClass);
  }

  return (
    <div className="flex flex-row flex-wrap">
      {newClassDisplay &&
        <NewClassDisplay
          colors={classBoxColors}
          addNewClass={addNewClass}
          setNewClassDisplay={setNewClassDisplay} />
      }
      {deleteClassDisplay &&
        <DeleteClassDisplay
          setDeleteClassDisplay={setDeleteClassDisplay}
          removeClass={removeClass}
          selectedClassId={selectedClassId} />
      }
      {classList.map((item, index) => {
        return (
          <div key={index} className="mx-4 my-4">
            <ClassBox
              id={item.id}
              name={item.name}
              color={item.color}
              handleRemove={() => {
                setDeleteClassDisplay(true);
                setSelectedClassId(item.id);
              }}
              onNavigate={() => {
                window.location.href = `/class/${item.id}`;
              }}
            />
          </div>
        );
      })}
      <button
        onClick={() => setNewClassDisplay(!newClassDisplay)}
        className="w-64 h-32 bg-zinc-700 rounded-3xl mx-4 my-4 text-4xl transition-transform duration-150 ease-out hover:scale-105"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

    </div>
  );
}
