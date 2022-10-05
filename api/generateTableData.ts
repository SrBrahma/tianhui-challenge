import { faker } from '@faker-js/faker';
import type { Users } from '../types/User';

// Note this is not acting at the moment as an API,
// but just as a function used in getServerSideProps.
export function generateData({ number }: { number: number }): Users {

  /** Min and max included https://stackoverflow.com/a/7228322 */
  function randomIntFromInterval(min: number, max: number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  const documents = [
    {
      name: 'Offer.pdf',
      image: 'https://images.sampletemplates.com/wp-content/uploads/2016/12/21102637/Technical-Business-Document.jpg',
    },
    {
      name: 'Employment.pdf',
      image: 'https://www.falsof.com/images/Document_Mutual_Release.gif',
    },
    {
      name: 'Assignement.pdf',
      image: 'https://images.sampleforms.com/wp-content/uploads/2016/11/Legal-Agreement-Form.jpg',
    },
    {
      name: 'Letter.pdf',
      image: 'https://www.nal.usda.gov/exhibits/speccoll/files/thumbnails/4d28334e14a44a47b3ada8c467ff5c72.jpg',
    },
    {
      name: 'Invoice.pdf',
      image: 'https://assets.website-files.com/609d5d3c4d120e9c52e52b07/609d5d3c4d120e370de52b70_invoice-lp-light-border.png',
    },
    {
      name: 'Contract.pdf',
      image: 'https://resources.gonitro.com/dims4/default/6adaf0e/2147483647/strip/true/crop/680x880+0+0/resize/680x880!/format/jpg/quality/90/?url=http%3A%2F%2Fnitro-brightspot.s3.amazonaws.com%2F16%2F31%2F7a6b84a34664b6d2a9460e252f41%2Fpdf-template-simple-contract-template.jpg',
    },
  ].map((e) => ({ ...e, id: faker.datatype.uuid() }));

  return ([...Array(number)]).map((_, index) => ({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    salary: `$${randomIntFromInterval(80, 150)},000`,
    jobType: faker.name.jobType(),
    documents: documents.slice(0, index + 1),
  }));
}
