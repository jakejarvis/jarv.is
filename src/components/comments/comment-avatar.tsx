import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

type CommentAvatarProps = {
  name: string;
  image?: string | null;
  className?: string;
};

const CommentAvatar = ({ name, image, className }: CommentAvatarProps) => (
  <Avatar className={cn("size-10", className)}>
    {image && (
      <AvatarImage
        src={getImageUrl(image, 40)}
        srcSet={`${getImageUrl(image, 40)} 1x, ${getImageUrl(image, 80)} 2x`}
        alt={`@${name}'s avatar`}
      />
    )}
    <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
  </Avatar>
);

export { CommentAvatar };
