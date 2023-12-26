import styles from "./Input.module.css";

export default function Input({ value, onChange, onClick }) {
  return (
    <div className={styles.wrapper} style={{marginBottom:"20px"}}>
      <input
        className={styles.text}
        placeholder="Your prompt here..."
        value={value}
        onChange={onChange}
      />
      {/* <button className={styles.btn} onClick={onClick}>
        Go
      </button> */}
    </div>
  );
}

// import React from "react";

// import styles from "./Input.module.css";
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';

// export default function Input({ value, onChange, onClick }) {
//   return (
//     <div className={styles.wrapper}>
//       <FormControl className={styles.formControl}>
//         <InputLabel id="task-select-label" style={{color:"#fff"}}>Select Task</InputLabel>
//         <Select
//           labelId="task-select-label"
//           id="task-select"
//           value={value}
//           onChange={onChange}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
//           className={styles.select}
//         >
//           <MenuItem value="translate">Translate</MenuItem>
//           <MenuItem value="synonym">Synonym</MenuItem>
//         </Select>
//       </FormControl>
//       <Button className={styles.btn} onClick={onClick} variant="contained" color="primary">
//         Go
//       </Button>
//     </div>
//   );
// }