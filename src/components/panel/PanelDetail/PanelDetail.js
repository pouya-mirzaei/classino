export default function PanelDetail({ headerTitle, className, children }) {
  return (
    <div className={`${className} bg-white dark:bg-dark-1 dark:text-white rounded-lg shadow-md shadow-black/20 overflow-hidden`}>
      {/* header */}
      <div className="bg-[#f6f8fc] dark:bg-dark-2 px-5 py-3 text-lg font-semibold">{headerTitle}</div>
      <div className="p-5">{children}</div>
    </div>
  );
}
