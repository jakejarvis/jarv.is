import { getImageProps } from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type CommentAvatarProps = {
  name: string;
  image?: string | null;
  className?: string;
};

const CommentAvatar = ({ name, image, className }: CommentAvatarProps) => {
  return (
    <Avatar className={cn("size-10", className)}>
      {image && (
        <AvatarImage
          {...getImageProps({
            src: image,
            alt: `@${name}'s avatar`,
            width: 40,
            height: 40,
          }).props}
          width={undefined}
          height={undefined}
        />
      )}
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export { CommentAvatar };
