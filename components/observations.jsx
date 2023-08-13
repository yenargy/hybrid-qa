export default function Observations({ data }) {
  return (
    <div className="w-full max-h-[90%] min-h-[90%] rounded-xl border bg-card text-card-foreground shadow p-10 overflow-auto">
      <h3 className="text-xl font-bold pb-2">History</h3>
      {data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <h3 className="text-sm font-medium pt-4 pb-2">Thought #{index+1}</h3>
              <div className="font-mono bg-slate-100 p-3 text-sm rounded-lg mb-2">
                {item.thought}
              </div>
              <h3 className="text-sm font-medium pt-4 pb-2">Action</h3>
              <div className="font-mono bg-slate-100 p-3 text-sm rounded-lg mb-2">
                {item.action}
              </div>
              <h3 className="text-sm font-medium pt-4 pb-2">Action Input</h3>
              <div className="font-mono bg-slate-100 p-3 text-sm rounded-lg mb-2">
                {item.actionInput}
              </div>
              <h3 className="text-sm font-medium pt-4 pb-2">Observations</h3>
              <div className="font-mono bg-slate-100 p-3 text-sm rounded-lg mb-2">
                {item.observations}
              </div>
              {(data.length > 1) && (data.length !== index+1) ? <hr className="mt-8 mb-4"/> : ''}
            </div>
          ))}
        </div>
      ) : ''}
    </div>
  )
}