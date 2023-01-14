import Container from "@/components/wordpress/container"

type YoutubePlayerProps = {
  videoId: string
}

export default function YoutubePlayer({ videoId }: YoutubePlayerProps) {
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
    <Container>
      <div style={styles.videoResponsive}>
        <iframe
          style={styles.iFrame}
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </Container>
  )
}
