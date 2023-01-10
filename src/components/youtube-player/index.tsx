import Container from "@/components/wordpress/container"
import style from "./youtube-player.module.scss"

type YoutubePlayerProps = {
  embedId: string
}

export default function YoutubePlayer({ embedId }: YoutubePlayerProps) {
  return (
    <Container>
      <div className={style.videoResponsive}>
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </Container>
  )
}
