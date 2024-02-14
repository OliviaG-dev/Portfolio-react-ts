import './Frise.css';
import { FriseProps } from '../../services/inteface';

const Frise: React.FC<FriseProps> = ({rotation}) => {
    const friseClasses = rotation ? 'Frise_rotate' : 'Frise';
  return (
    <div className={friseClasses}>
      <div className="rect_round"></div>
       
      <div className="Frise_rect"></div>
    </div>
  );
}

export default Frise;
