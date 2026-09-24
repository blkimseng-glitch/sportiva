"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  getCommentsByEvent,
  createComment,
  deleteComment,
} from "@/services/commentService"; // ផ្លូវ Import ទៅ Service របស់អ្នក

interface Props {
  eventUuid: string;
}

export default function CommentSectionComponent({ eventUuid }: Props) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadComments = async () => {
    if (!eventUuid) return;
    try {
      setLoading(true);
      const res = await getCommentsByEvent(eventUuid);
      setComments(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [eventUuid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      await createComment({ eventUuid, content: newComment });
      setNewComment("");
      loadComments();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm("ចង់លុប Comment នេះមែនទេ?")) return;
    try {
      await deleteComment(uuid);
      setComments((prev) => prev.filter((item) => (item.uuid || item.id) !== uuid));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-[#121c2d] border border-slate-800 rounded-xl p-6 space-y-6 mt-8">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        <h3 className="text-base font-bold text-slate-100">
          មតិយោបល់ ({comments.length})
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder="សរសេរមតិយោបល់..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-[#162235] border-slate-700/60 text-slate-200 text-xs focus-visible:ring-blue-500 min-h-[90px]"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 h-9 gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            {submitting ? "កំពុងផ្ញើ..." : "បញ្ជូនមតិ"}
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-6 text-slate-500 text-xs">កំពុងទាញយកមតិ...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
          មិនទាន់មានមតិយោបល់ទេ
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((item, index) => {
            const commentUuid = item?.uuid || item?.id || index;
            return (
              <div
                key={commentUuid}
                className="flex items-start justify-between gap-4 p-4 bg-[#162235] rounded-lg border border-slate-800/80 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-200 block">
                      {item?.user?.name || item?.author || "អ្នកប្រើប្រាស់"}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item?.content || item?.comment || ""}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(commentUuid)}
                  className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}