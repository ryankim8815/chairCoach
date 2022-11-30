import { useNavigate, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "./../../atoms/user";

// style
import * as S from "../../styles/BtnStyle";
import { NavLayout } from "./HeaderStyle";

const Nav = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  return (
    <NavLayout>
      <ul>
        <li>
          <Link to="/chaircoach">체어코치</Link>
        </li>
        <li>
          <Link to="/aboutneck">거북목진단</Link>
        </li>
        {user && (
          <li>
            <S.SmallBtn onClick={() => navigate("/mypage")}>
              마이페이지
            </S.SmallBtn>
          </li>
        )}
      </ul>
    </NavLayout>
  );
};

export default Nav;
