export default function LinearContainer({ children }) {
  return (
    <div className="Linearcontainer">
      <div className="blob blob-warm" />
      <div className="blob blob-cool" />
      <div className="content">{children}</div>
    </div>
  );
}
