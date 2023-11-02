import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function PageLink(props) {
  return (
    <Link
      to={props.to}
      className={`page-link move-forward ${
        props.position === 'start'
          ? 'me-auto'
          : props.position === 'center'
          ? 'mx-auto'
          : props.position === 'end'
          ? 'ms-auto'
          : ''
      }`}
    >
      {props.label}
      <FaArrowRight className='fill-grullo' />
    </Link>
  );
}
