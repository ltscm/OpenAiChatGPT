import styles from "./History.module.css";

export default function History({ question, onClick }) {
  return (
    <div  onClick={onClick}>
      {/* <p style={{color:'#fff'}}>{question.substring(0, 15)}...</p> */}
    </div>
  );
}