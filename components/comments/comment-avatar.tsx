import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        src={image}
        alt={`@${name}'s avatar`}
        loading="lazy"
      />
    )}
    <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
  </Avatar>
);

export { CommentAvatar };
