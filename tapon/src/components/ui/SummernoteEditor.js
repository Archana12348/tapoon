// import React, { useEffect, useRef } from "react";
// import $ from "jquery";
// import "summernote/dist/summernote-bs4.min.css";
// import "summernote/dist/summernote-bs4.min.js";

// const SummernoteEditor = ({ onChange, initialContent = "" }) => {
//   const editorRef = useRef();

//   useEffect(() => {
//     // Initialize Summernote
//     $(editorRef.current).summernote({
//       placeholder: "Write something here...",
//       height: 200,
//       tabsize: 2,
//       callbacks: {
//         onChange: (contents) => {
//           if (onChange) onChange(contents); // Send content to parent
//         },
//       },
//     });

//     // Set initial content if provided
//     $(editorRef.current).summernote("code", initialContent);

//     // Cleanup on unmount
//     return () => {
//       $(editorRef.current).summernote("destroy");
//     };
//   }, [initialContent, onChange]);

//   return <div ref={editorRef}></div>;
// };

// export default SummernoteEditor;
