import React from "react";

const ImageFile = ({ label, files, setFiles }) => {
  const handleInputFile = (e) => {
    //console.log(files);
    setFiles(e.target.files);
  };

  return (
    <div className="field">
      <label className="label">{label}</label>
      {files.length > 0 && (
        <div className="my-1">
          <figure className="image is-96x96">
            <img
              src={URL.createObjectURL(files[0])}
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
          </figure>
        </div>
      )}
      <div className="control">
        <div className="file has-name">
          <label className="file-label">
            <input
              className="file-input"
              accept="image/*"
              type="file"
              name="image"
              multiple={false}
              onChange={handleInputFile}
            />
            <span className="file-cta">
              {/* <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span> */}
              <span className="file-label">
                {files.length < 1 ? "Choose a file…" : "Change"}
              </span>
            </span>
            {files.length > 0 && (
              <span className="file-name">{files[0].name}</span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageFile;
