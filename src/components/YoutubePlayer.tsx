type YoutubePlayerProps = {
  videoUrl: string
}

function getYouTubeId(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}

export default function YoutubePlayer({ videoUrl }: YoutubePlayerProps) {
  const styles = {
    videoResponsive: {
      overflow: "hidden",
      paddingBottom: "56.25%",
      position: "relative" as "relative",
      height: 0,
    },
    iFrame: {
      left: 0,
      top: 0,
      height: "100%",
      width: "100%",
      position: "absolute" as "absolute",
    },
  }

  return (
    <section style={styles.videoResponsive}>
      <iframe
        style={styles.iFrame}
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${getYouTubeId(videoUrl)}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </section>
  )
}
