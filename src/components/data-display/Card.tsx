export function Card() {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <div style={{ width: "100%", height: "100px", position: "relative" }}>
          <img
            src={
              "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png"
            }
            alt="Card Image"
            className=" object-cover"
          />
        </div>

        {/* Content goes here */}
        {/* We use less vertical padding on card headers on desktop than on body sections */}
      </div>

      <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>

      <div className="px-4 py-4 sm:px-6">
        {/* Content goes here */}
        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
      </div>
    </div>
  )
}
