import { auth } from "@app/server/auth";
import { redirect } from "next/navigation";
import { getCourse, type HasCourse } from "@app/hooks/courses";
import type { Metadata } from "next";
import { EditCoursePages } from "@app/components/edit-course-lessons";

export const metadata: Metadata = {
  title: "Edit Course",
  description: "Here you can edit a course.",
};

export default async function EditCourseLayout({
  children,
  params,
}: Readonly<{
  params: Promise<HasCourse>;
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  const { courseId } = await params;
  const course = await getCourse(courseId);

  return (
    <div id={`edit-${courseId}`} className="bg-base-200">
      <EditCoursePages course={course}>
        <>{children}</>
      </EditCoursePages>
    </div>
  );
}
