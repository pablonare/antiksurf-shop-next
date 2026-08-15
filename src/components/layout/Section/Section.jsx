// Section.jsx
import styles from "./Section.module.css";

function Section({ children, as: Tag = "section", spacing = "md", className = "" }) {
  return (
    <Tag className={`${styles.section} ${styles[spacing]} ${className}`}>
      {children}
    </Tag>
  );
}

export default Section;