import './Frise.css';
import { FriseProps } from '../../utils/inteface';

const Frise: React.FC<FriseProps> = ({rotation}) => {
    const friseClasses = rotation ? 'Frise_rotate' : 'Frise';
  return (
    <div className={friseClasses}>
      <div className="rect_round">
        <span className="Frise_round_one"></span>
        <span className="Frise_round_two"></span>
        <span className="Frise_round_three"></span>
        <span className="Frise_round_for"></span>
        <span className="Frise_round_five"></span>
        {/* <span className="Frise_round_six"></span>
        <span className="Frise_round_seven"></span> */}
      </div>
      <div className="Frise_rect"></div>
    </div>
  );
}

export default Frise;
