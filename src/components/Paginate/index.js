import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import List from '../List';
import styles from './Paginate.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// Example items, to simulate fetching from another resources.
/*const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item.name}</h3>
          </div>
        ))}
    </>
  );
}*/

function PaginatedItems({ itemsPerPage, project }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = project.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(project.length / itemsPerPage);

  // Invoke when project click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % project.length;
    console.log(`project requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <List currentItems={currentItems} />
      <div className={cx('pagination')}>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName={cx('page-item')}
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName={cx('page-link')}
          nextClassName={cx('page-item')}
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName={cx('active')}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.

function Paginate({ list, numItems }) {
  return <PaginatedItems itemsPerPage={numItems} project={list} />;
}

export default Paginate;
