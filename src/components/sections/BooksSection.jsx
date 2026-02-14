import React from "react";
import LibraryRow from "./library/LibraryRow";

const BooksSection = ({ ref }) => {
  return (
    <section className={`flex flex-col gap-8`} ref={ref} style={{ opacity: 0 }}>
      <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-2">
        Library
      </h2>

      <div className="flex flex-col">
        <LibraryRow
          title="Functional Programming in Scala"
          author="Michael Pilquist, Rúnar Bjarnason, and Paul Chiusano"
          status="Reading"
          cover="https://images.manning.com/360/480/resize/book/7/28e607e-d1f1-4a84-badc-d8f436f4e4b9/Pilquist-2ed-HI.png"
          link="https://www.manning.com/books/functional-programming-in-scala-second-edition"
        />

        <LibraryRow
          title="Atomic Habits"
          author="James Clear"
          status="Reading"
          cover="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg"
          link="https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834"
        />

        <LibraryRow
          title="The Pragmatic Programmer"
          author="David Thomas & Andrew Hunt"
          status="To Read"
          cover="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg"
          link="#"
        />
        <LibraryRow
          title="Source Code"
          author="Bill Gates"
          status="To Read"
          cover="https://m.media-amazon.com/images/I/71yR+jQLqXL._AC_UF1000,1000_QL80_.jpg"
          link="https://www.amazon.in/Source-Code-Beginnings-Bill-Gates-ebook/dp/B0D5TZ1N6M"
        />
      </div>
    </section>
  );
};

export default BooksSection;
