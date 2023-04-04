import Header from '../component/Header';

function HeaderOnlyLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="cointainer">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnlyLayout;
