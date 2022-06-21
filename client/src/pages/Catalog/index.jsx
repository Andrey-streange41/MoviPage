import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { MovieGrid } from '../../components/MovieGrid';
import { category as cate} from '../../DB/dbForApi';

const Catalog = () => {

  const {category} = useParams();
  return (
    <>
    <PageHeader>
       Movie
    </PageHeader>
      <div className='container'>
        <section className='section mb-3'>
          <MovieGrid category={category}/>
        </section>
      </div>
    </>
  )
}

export default Catalog