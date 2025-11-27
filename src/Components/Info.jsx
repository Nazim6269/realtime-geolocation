import PropTypes from "prop-types";

export  const Info = ({ label, value }) => (
  <div className="bg-white/15 rounded-lg p-2 text-center">
    <p className="text-xs opacity-70">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

Info.propTypes={
    label:PropTypes.string,
    value:PropTypes.string
}