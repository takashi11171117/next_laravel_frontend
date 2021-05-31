const Pagination = ({
  changePage,
  containerClass = 'pagination',
  buttonIcons = false,
  prevButtonClass = 'page-item',
  prevButtonText = 'Prev',
  prevButtonIcon = 'fa fa-chevron-left',
  nextButtonClass = 'page-item',
  nextButtonText = 'Next',
  nextButtonIcon = 'fa fa-chevron-right',
  numberButtonClass = 'page-item',
  numberClass = 'page-link',
  numbersCountForShow = 2,
  activeClass = 'active',
  paginationData = {},
  requestParams = null
}) => {
  const isCurrent = (page) => {
    if (paginationData !== null) {
      let currentPage = paginationData.meta ? paginationData.meta.current_page : paginationData.current_page
      return currentPage === page
    }

    return false
  }

  const handleClick = (page) => {
    let parameters = {}
    if (requestParams) {
      parameters = requestParams
    }
    parameters.page = page
    changePage(parameters)
  }

  const generateButtonsPrev = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    )
  }

  const generateButtonsNext = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )
  }

  const generatePagination = () => {
    let pagination
    if (Object.keys(paginationData).length) {
      let current = paginationData.hasOwnProperty('current_page')
          ? paginationData.current_page
          : paginationData.meta.current_page,
        last = paginationData.hasOwnProperty('last_page') ? paginationData.last_page : paginationData.meta.last_page,
        delta = parseInt(numbersCountForShow),
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l
      for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
          range.push(i)
        }
      }
      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1)
          } else if (i - l !== 1) {
            rangeWithDots.push('...')
          }
        }
        rangeWithDots.push(i)
        l = i
      }

      let nextPageUrl = paginationData.links.next
      console.log(nextPageUrl)
      let prevPageUrl = paginationData.links.prev
      pagination = (
        <ul className={containerClass}>
          {prevPageUrl ? (
            <li
              className={prevButtonClass}
              onClick={(event) => {
                event.preventDefault()
                handleClick(current - 1)
              }}
            >
              <a href="" className={numberClass}>
                {generateButtonsPrev()}
              </a>
            </li>
          ) : (
            ''
          )}
          {rangeWithDots.map((page, index) => generateNumber(page, index))}
          {nextPageUrl ? (
            <li
              className={nextButtonClass}
              onClick={(event) => {
                event.preventDefault()
                handleClick(current + 1)
              }}
            >
              <a href="" className={numberClass}>
                {generateButtonsNext()}
              </a>
            </li>
          ) : (
            ''
          )}
        </ul>
      )
    }
    return pagination
  }

  const generateNumber = (page, index) => {
    return (
      <li className={isCurrent(page) ? numberButtonClass + ' ' + activeClass : numberButtonClass} key={index}>
        <a
          href=""
          className={numberClass}
          onClick={(event) => {
            event.preventDefault()
            handleClick(page === '...' ? index + 1 : page)
          }}
        >
          {page}
        </a>
      </li>
    )
  }

  return generatePagination()
}

export default Pagination
