export default function Sidebar({
  onUpload,
  loading,
}) {

  function handleChange(e) {

    const file =
      e.target.files[0];

    if (file) {
      onUpload(file);
    }
  }

  return (
    <div className="sidebar ">
         <h1>
          🗎 IntelliSearch
        </h1>

      <h2>
        Upload Document
      </h2>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleChange}
      />

      {loading && (
        <p>Uploading...</p>
      )}

    </div>
  );
}