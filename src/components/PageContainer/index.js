import styled from "./index.module.scss";

const PageContainer = ({ children }) => {
  return <div className={styled.pageContainer}>{children}</div>;
};

export default PageContainer;
