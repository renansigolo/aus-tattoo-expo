import Container from "@/components/wordpress/container"
import style from "./youtube-player.module.scss"

type YoutubePlayerProps = {
  videoId: string
}

export default function YoutubePlayer({ videoId }: YoutubePlayerProps) {
  return (
    <Container>
      <div className={style.videoResponsive}>
        <iframe
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
