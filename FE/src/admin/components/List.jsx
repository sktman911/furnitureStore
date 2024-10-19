import React from 'react'

const List = React.memo(({ listTitle, listItem, render }) => {
  return (
    <div className="w-11/12 mx-auto shadow-2xl rounded-sm border-2 border-gray-300">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700 ">
            {listTitle.map((item, index) => (
              <th key={index} className='p-3'>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listItem.map((item, index) => (
            <tr key={index} className="px-5 py-3 border-b h-full ">
              {render(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default List;
