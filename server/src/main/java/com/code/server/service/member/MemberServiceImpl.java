package com.code.server.service.member;

import com.code.server.dto.member.MemberDto;
import com.code.server.dto.member.MemberMapper;
import com.code.server.dto.member.MemberRegisterRequest;
import com.code.server.entity.Event;
import com.code.server.entity.Member;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.EventRepository;
import com.code.server.repository.MemberRepository;
import com.code.server.service.areasOfInterest.AreasOfInterestEntityService;
import com.code.server.service.event.EventEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final EventRepository eventRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final AreasOfInterestEntityService  areasOfInterestEntityService;
    private final EventEntityService eventEntityService;

    /**
     * This method isn't meant to be used, the creation of staff
     * doesn't take a DTO object, you should use the `register` method
     * @param memberDto
     * @return
     */
    @Deprecated(forRemoval = false)
    @Override
    public MemberDto save(MemberDto memberDto) {
        return null;
    }

    @Override
    public MemberDto update(MemberDto memberDto) {
        Member member = memberRepository.findById(memberDto.getId())
                .orElseThrow(() -> new NotFoundException("Staff member not found"));

        member.setEmail(memberDto.getEmail());

        return memberMapper.toDTO(memberRepository.save(member));
    }

    @Override
    public void delete(UUID id) {
        memberRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public MemberDto findById(UUID id) {
        return memberRepository.findById(id)
                .map(memberMapper::toDTO)
                .orElseThrow(() -> new NotFoundException("Staff member not found"));
    }

    @Override
    public MemberDto register(MemberRegisterRequest request) {
        // Creating the staff entity
        Member member = Member.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .areaOfInterests(
                        request.getAreaOfInterests()
                                .stream()
                                .map(areasOfInterestEntityService::findById)
                                .collect(Collectors.toSet())
                )
                .year(request.getYear())
                .major(request.getMajor())
                .build();

        return memberMapper.toDTO(memberRepository.save(member));
    }

    /**
     * This function registers a user to an event
     * @param member
     * @param eventId
     */
    @Override
    public void registerMember(Member member, UUID eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Event not found"));
        Member newMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new NotFoundException("Member not found"));

        if (!newMember.getInterestEvents().contains(event)) {
            newMember.getInterestEvents().add(event);
            event.getMembers().add(newMember);

            memberRepository.save(newMember);
        }
    }
}
