import ListingForm from '../components/ListingForm';

export default function EditListing() {
  return (
    <main className='max-w-7xl px-4 mx-auto'>
      <h1 className='title'>Edit Listing</h1>
      <ListingForm type='edit' />
    </main>
  );
}
