import { useActiveJobItemData } from "../lib/hooks";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

export default function JobItemContent() {

  
  const {jobItemData, isLoading} = useActiveJobItemData();
  
  if (isLoading){
    return <LoadingJobContent/>
  }

  if (!jobItemData) return <EmptyJobContent />;


  return (
    <section className="job-details">
      <div>
        <img src={jobItemData.coverImgURL} alt="#" />

        <a className="apply-btn" href={jobItemData.companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{jobItemData.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{jobItemData.daysAgo}d</time>

              <BookmarkIcon id = {jobItemData.id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{jobItemData.title}</h2>
            <p className="job-info__company">{jobItemData.company}</p>
            <p className="job-info__description">{jobItemData.description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {jobItemData.duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {jobItemData.salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                {jobItemData.location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>
            <ul className="qualifications__list">
              {jobItemData.qualifications.map((qualification) => (
                <li key={qualification} className="qualifications__item">
                  {qualification}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>
            <ul className="reviews__list">
              {jobItemData.reviews.map(review => <li key = {review} className="reviews__item">{review}</li>)}
            </ul>
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtDev</span>, we would really appreciate
            it!
          </p>
        </footer>
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}


function LoadingJobContent() {
  return (
    <section className="job-details">
      <div>
      <Spinner/> 
      </div>
    </section>
  );
}