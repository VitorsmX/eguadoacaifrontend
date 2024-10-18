import { memo } from 'react'
import PropTypes from 'prop-types'
import BenefitsList from '../BenefitsList';

const Benefits = memo((props) => {
  if(!props && !props.benefits && props.benefits.length === 0) {
    return null
  }
  const {benefits, title} = props
  return (
    <section className="flex flex-col items-center justify-center py-16">
      <h2 className="text-xl sm:text-3xl font-bold mb-8">
        {title ? title : 'Benefícios de Comprar com a Gente'}
      </h2>
      <div className="space-y-12 sm:w-4/5 w-[90%] text-gray-200">
        <BenefitsList benefitsList={benefits}></BenefitsList>
      </div>
    </section>
  );
});

Benefits.propTypes = {}
Benefits.displayName = "Benefits"
export default Benefits
