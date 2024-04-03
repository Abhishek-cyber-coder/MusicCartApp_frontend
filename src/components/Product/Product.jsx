import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Product.module.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import posterImg from "../../assets/images/posterImg.png";
import searchIcon from "../../assets/icon/searchIcon.svg";

import {
  brandOptions,
  colourOptions,
  headphoneTypeOptions,
  priceOptions,
  sortOptions,
} from "../../utils/options";
import {
  selectStyles,
  selectStylesMobile,
  sortingStyle,
} from "../../utils/customSelectStyle";
import ProductGridItem from "../ProductGridItem/ProductGridItem";
import {
  getAllProductsAsync,
  selectAllProducts,
  selectIsLoading,
} from "../../Features/product/productSlice";
import ProductListItem from "../ProductListItem/ProductListItem";
import { useLocation } from "react-router-dom";

function Product({ mobileView }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectNavbarHeight = useSelector((state) => state.ui.navbarHeight);
  const allProducts = useSelector(selectAllProducts);
  const loading = useSelector(selectIsLoading);
  const [displayStyle, setDisplayStyle] = useState("grid");
  const [filters, setFilters] = useState({
    headphoneType: "",
    company: "",
    color: "",
    priceRange: "",
    sortBy: "",
    search: "",
  });
  const [sortingLabel, setSortingLabel] = useState("Featured");

  const filterHandler = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSorting = (selectedOption) => {
    setSortingLabel(selectedOption ? selectedOption.label : null);
    filterHandler("sortBy", selectedOption ? selectedOption.value : null);
  };
  const updateFilterHandler = (e) => {
    filterHandler("search", e?.target?.value);
  };
  const debouncedOnChange = debounce(updateFilterHandler, 300);

  useEffect(() => {
    dispatch(getAllProductsAsync(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    const { state } = location;
    if (state && state.search) {
      filterHandler("search", state.search);
    } else {
      filterHandler("search", "");
    }
  }, [location]);

  return (
    <>
      <div
        style={
          mobileView
            ? { marginTop: "110px" }
            : { marginTop: `${selectNavbarHeight + 50}px` }
        }
        className={styles.posterSection}
      >
        <div>
          <p>Grab upto 50% off on</p>
          <p>Selected headphones</p>
        </div>

        <img src={posterImg} alt="Poster" />
      </div>

      {!mobileView && (
        <div className={styles.searchBarContainer}>
          <img src={searchIcon} alt="Search Icon" />
          <input type="text" onChange={debouncedOnChange} />
        </div>
      )}
      <div className={styles.allFiltersContainer}>
        {!mobileView && (
          <div className={styles.productDisplayStyle}>
            <svg
              onClick={() => setDisplayStyle("grid")}
              width="49"
              height="50"
              viewBox="0 0 49 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1854 22.963C9.06504 22.963 8.10559 22.5638 7.30707 21.7653C6.50855 20.9668 6.10997 20.008 6.11133 18.889V10.7408C6.11133 9.62046 6.51059 8.66101 7.30911 7.86249C8.10763 7.06397 9.06639 6.66539 10.1854 6.66675H18.3336C19.4539 6.66675 20.4134 7.06601 21.2119 7.86453C22.0104 8.66305 22.409 9.62181 22.4076 10.7408V18.889C22.4076 20.0093 22.0084 20.9688 21.2099 21.7673C20.4113 22.5658 19.4526 22.9644 18.3336 22.963H10.1854ZM10.1854 43.3334C9.06504 43.3334 8.10559 42.9342 7.30707 42.1356C6.50855 41.3371 6.10997 40.3784 6.11133 39.2593V31.1112C6.11133 29.9908 6.51059 29.0314 7.30911 28.2329C8.10763 27.4343 9.06639 27.0358 10.1854 27.0371H18.3336C19.4539 27.0371 20.4134 27.4364 21.2119 28.2349C22.0104 29.0334 22.409 29.9922 22.4076 31.1112V39.2593C22.4076 40.3797 22.0084 41.3392 21.2099 42.1377C20.4113 42.9362 19.4526 43.3348 18.3336 43.3334H10.1854ZM30.5558 22.963C29.4354 22.963 28.476 22.5638 27.6774 21.7653C26.8789 20.9668 26.4803 20.008 26.4817 18.889V10.7408C26.4817 9.62046 26.881 8.66101 27.6795 7.86249C28.478 7.06397 29.4368 6.66539 30.5558 6.66675H38.7039C39.8243 6.66675 40.7837 7.06601 41.5823 7.86453C42.3808 8.66305 42.7794 9.62181 42.778 10.7408V18.889C42.778 20.0093 42.3787 20.9688 41.5802 21.7673C40.7817 22.5658 39.8229 22.9644 38.7039 22.963H30.5558ZM30.5558 43.3334C29.4354 43.3334 28.476 42.9342 27.6774 42.1356C26.8789 41.3371 26.4803 40.3784 26.4817 39.2593V31.1112C26.4817 29.9908 26.881 29.0314 27.6795 28.2329C28.478 27.4343 29.4368 27.0358 30.5558 27.0371H38.7039C39.8243 27.0371 40.7837 27.4364 41.5823 28.2349C42.3808 29.0334 42.7794 29.9922 42.778 31.1112V39.2593C42.778 40.3797 42.3787 41.3392 41.5802 42.1377C40.7817 42.9362 39.8229 43.3348 38.7039 43.3334H30.5558Z"
                stroke="black"
                fill={displayStyle === "grid" ? "black" : "white"}
              />
            </svg>
            <svg
              onClick={() => setDisplayStyle("list")}
              width="61"
              height="60"
              viewBox="0 0 61 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.9443 15.0004C52.946 14.2937 52.7068 13.7004 52.2268 13.2204C51.7468 12.7404 51.1527 12.5004 50.4443 12.5004H22.9443C22.2377 12.4987 21.6443 12.7379 21.1643 13.2179C20.6843 13.6979 20.4443 14.292 20.4443 15.0004H52.9443ZM52.9443 15.0004V20.0004C52.9443 20.7087 52.7043 21.3029 52.2243 21.7829C51.7443 22.2629 51.151 22.502 50.4443 22.5004L52.9443 15.0004ZM8.72212 20.0022V20.0004V15.0004C8.72212 14.4883 8.8871 14.0951 9.21432 13.7678C9.54144 13.4407 9.93328 13.2769 10.4425 13.2782V13.2782H10.4443H15.4443C15.9564 13.2782 16.3497 13.4431 16.6769 13.7703C17.004 14.0975 17.1678 14.4893 17.1666 14.9985V15.0004V20.0004C17.1666 20.5124 17.0016 20.9057 16.6744 21.2329C16.3472 21.56 15.9554 21.7238 15.4462 21.7226H15.4443H10.4443C9.93229 21.7226 9.53903 21.5576 9.21182 21.2304L8.66966 21.7726L9.21182 21.2304C8.88469 20.9033 8.72092 20.5114 8.72212 20.0022ZM21.2221 20.0022V20.0004V15.0004C21.2221 14.4883 21.3871 14.0951 21.7143 13.7678C22.0414 13.4407 22.4333 13.2769 22.9425 13.2782H22.9443H50.4443C50.9564 13.2782 51.3497 13.4431 51.6769 13.7703C52.004 14.0975 52.1678 14.4893 52.1666 14.9985V15.0004V20.0004C52.1666 20.5124 52.0016 20.9057 51.6744 21.2329C51.3472 21.56 50.9554 21.7238 50.4462 21.7226H50.4443H22.9443C22.4323 21.7226 22.039 21.5576 21.7118 21.2304C21.3847 20.9033 21.2209 20.5114 21.2221 20.0022ZM21.2221 32.5022V32.5004V27.5004C21.2221 26.9883 21.3871 26.5951 21.7143 26.2678C22.0414 25.9407 22.4333 25.7769 22.9425 25.7782H22.9443H50.4443C50.9564 25.7782 51.3497 25.9431 51.6769 26.2703C52.004 26.5975 52.1678 26.9893 52.1666 27.4985V27.5004V32.5004C52.1666 33.0124 52.0016 33.4057 51.6744 33.7329C51.3472 34.06 50.9554 34.2238 50.4462 34.2226H50.4443H22.9443C22.4323 34.2226 22.039 34.0576 21.7118 33.7304C21.3847 33.4033 21.2209 33.0114 21.2221 32.5022ZM8.72212 32.5022V32.5004V27.5004C8.72212 26.9883 8.8871 26.5951 9.21432 26.2678L8.66434 25.7179L9.21432 26.2678C9.54144 25.9407 9.93328 25.7769 10.4425 25.7782H10.4443H15.4443C15.9564 25.7782 16.3497 25.9431 16.6769 26.2703C17.004 26.5975 17.1678 26.9893 17.1666 27.4985V27.5004V32.5004C17.1666 33.0124 17.0016 33.4057 16.6744 33.7329C16.3472 34.06 15.9554 34.2238 15.4462 34.2226H15.4443H10.4443C9.93229 34.2226 9.53903 34.0576 9.21182 33.7304C8.88469 33.4033 8.72092 33.0114 8.72212 32.5022ZM21.2221 45.0022V45.0004V40.0004C21.2221 39.4883 21.3871 39.0951 21.7143 38.7679C22.0414 38.4407 22.4333 38.277 22.9425 38.2782H22.9443H50.4443C50.9564 38.2782 51.3497 38.4431 51.6769 38.7704C52.004 39.0975 52.1678 39.4893 52.1666 39.9985V40.0004V45.0004C52.1666 45.5124 52.0016 45.9057 51.6744 46.2329C51.3472 46.56 50.9554 46.7238 50.4462 46.7226H50.4443H22.9443C22.4323 46.7226 22.039 46.5576 21.7118 46.2304C21.3847 45.9033 21.2209 45.5114 21.2221 45.0022ZM8.72212 45.0022V45.0004V40.0004C8.72212 39.4883 8.8871 39.0951 9.21432 38.7679L8.67113 38.2247L9.21432 38.7678C9.54144 38.4407 9.93328 38.277 10.4425 38.2782H10.4443H15.4443C15.9564 38.2782 16.3497 38.4431 16.6769 38.7704C17.004 39.0975 17.1678 39.4893 17.1666 39.9985V40.0004V45.0004C17.1666 45.5124 17.0016 45.9057 16.6744 46.2329C16.3472 46.56 15.9554 46.7238 15.4462 46.7226H15.4443H10.4443C9.93229 46.7226 9.53903 46.5576 9.21182 46.2304C8.88469 45.9033 8.72092 45.5114 8.72212 45.0022ZM20.4443 32.5004V27.5004C20.4443 26.792 20.6843 26.1979 21.1643 25.7179C21.6443 25.2379 22.2377 24.9987 22.9443 25.0004L20.4443 32.5004Z"
                fill={displayStyle === "list" ? "black" : "white"}
                stroke="black"
                strokeWidth="1.55556"
              />
            </svg>
          </div>
        )}
        {mobileView && (
          <div className={styles.sortingBox}>
            <Select
              placeholder={`Sort by : ${sortingLabel} ⌵`}
              value={`Sort by: `}
              menuPortalTarget={document.body}
              isSearchable={false}
              options={sortOptions}
              styles={sortingStyle}
              onChange={(selectedOption) => handleSorting(selectedOption)}
            />
          </div>
        )}
        <div className={styles.filterContainer}>
          <Select
            menuPortalTarget={document.body}
            isSearchable={false}
            name="headphoneType"
            placeholder={"Headphone type ⌵"}
            options={headphoneTypeOptions}
            styles={mobileView ? selectStylesMobile : selectStyles}
            onChange={(selectedOption) =>
              filterHandler(
                "headphoneType",
                selectedOption ? selectedOption.value : null
              )
            }
          />
          <Select
            menuPortalTarget={document.body}
            isSearchable={false}
            name="brand"
            placeholder="Company ⌵"
            options={brandOptions}
            styles={mobileView ? selectStylesMobile : selectStyles}
            onChange={(selectedOption) =>
              filterHandler(
                "company",
                selectedOption ? selectedOption.value : null
              )
            }
          />
          <Select
            menuPortalTarget={document.body}
            isSearchable={false}
            name="color"
            placeholder="Colour ⌵"
            options={colourOptions}
            styles={mobileView ? selectStylesMobile : selectStyles}
            onChange={(selectedOption) =>
              filterHandler(
                "color",
                selectedOption ? selectedOption.value : null
              )
            }
          />
          <Select
            menuPortalTarget={document.body}
            isSearchable={false}
            name="price"
            placeholder="Price ⌵"
            options={priceOptions}
            styles={mobileView ? selectStylesMobile : selectStyles}
            onChange={(selectedOption) =>
              filterHandler(
                "priceRange",
                selectedOption ? selectedOption.value : null
              )
            }
          />
        </div>
        {!mobileView && (
          <div className={styles.sortingContainer}>
            <Select
              isSearchable={false}
              placeholder={`Sort by : ${sortingLabel} ⌵`}
              value={`Sort by: `}
              options={sortOptions}
              styles={sortingStyle}
              onChange={(selectedOption) => handleSorting(selectedOption)}
            />
          </div>
        )}
      </div>

      {mobileView && <hr />}
      {displayStyle === "grid" ? (
        <div className={styles.gridViewContainer}>
          {loading ? (
            <div style={{ height: "100vh" }}>Loading...</div>
          ) : (
            allProducts?.map((product, index) => {
              return <ProductGridItem key={index} productDetail={product} />;
            })
          )}
        </div>
      ) : (
        <div className={styles.listViewContainer}>
          {loading ? (
            <div style={{ height: "100vh" }}>Loading...</div>
          ) : (
            allProducts?.map((product, index) => {
              return <ProductListItem key={index} productDetail={product} />;
            })
          )}
        </div>
      )}

      <div className={styles.push}></div>
    </>
  );
}

export default Product;
